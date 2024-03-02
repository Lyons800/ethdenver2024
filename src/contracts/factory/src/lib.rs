use near_contract_standards::non_fungible_token::metadata::NFTContractMetadata;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LookupMap, UnorderedMap};
use near_sdk::json_types::U128; // Make sure U128 is imported
use near_sdk::json_types::ValidAccountId;
use near_sdk::{env, log, near_bindgen, AccountId, Balance, BorshStorageKey, Gas, PanicOnDefault, Promise, PromiseOrValue}; // Ensure PromiseOrValue is imported
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::serde_json; // Ensure serde_json is imported
use std::convert::TryFrom;
// use std::convert::TryInto;

near_sdk::setup_alloc!();

const NFT_WASM_CODE: &[u8] = include_bytes!("../../nft/res/nft_simple.wasm");

const GAS_FOR_NFT_DEPLOYMENT: Gas = 50_000_000_000_000;
const STORAGE_BYTES_PER_NFT: usize = 10000;

type TokenId = String;

#[derive(BorshSerialize, BorshStorageKey)]
enum StorageKey {
    Tokens,
    StorageDeposits,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct TokenFactory {
    pub tokens: UnorderedMap<TokenId, TokenArgs>,
    pub storage_deposits: LookupMap<AccountId, Balance>,
}

#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct TokenArgs {
    owner_id: AccountId, // Changed from ValidAccountId for simplicity
    metadata: NFTContractMetadata,
}


#[near_bindgen]
impl TokenFactory {
    #[init]
    pub fn new() -> Self {
        Self {
            tokens: UnorderedMap::new(StorageKey::Tokens),
            storage_deposits: LookupMap::new(StorageKey::StorageDeposits),
        }
    }


    pub fn get_required_storage_deposit(&self, args: &TokenArgs) -> Balance {
        let data_size = args.try_to_vec().expect("Failed to serialize").len() as u64;
        // Corrected the arithmetic operation to ensure correct type conversion
        ((NFT_WASM_CODE.len() as u64 + data_size * 2 + STORAGE_BYTES_PER_NFT as u64) as u128 * env::storage_byte_cost()).into()
    }

    #[payable]
    pub fn storage_deposit(&mut self) -> PromiseOrValue<()> {
        let account_id = env::predecessor_account_id();
        let deposit = env::attached_deposit();
        
        let previous_balance = self.storage_deposits.get(&account_id).unwrap_or(0);
        self.storage_deposits.insert(&account_id, &(previous_balance + deposit));

        if deposit < self.get_required_storage_deposit(&TokenArgs::default()) {
            log!("Deposit is lower than the minimum storage balance");
            PromiseOrValue::Value(())
        } else {
            PromiseOrValue::Value(())
        }
    }


    #[payable]
    pub fn create_nft_contract(&mut self, args: TokenArgs) -> Promise {
        let attached_deposit = env::attached_deposit();
        let required_deposit = self.get_required_storage_deposit(&args);

        assert!(
            attached_deposit >= required_deposit,
            "Attached deposit is less than the required storage deposit"
        );

        let token_id = format!("{}.{}", args.metadata.symbol, env::current_account_id()).to_lowercase();
        assert!(
            env::is_valid_account_id(token_id.as_bytes()),
            "Generated token account ID is invalid"
        );
        assert!(
            self.tokens.insert(&token_id, &args).is_none(),
            "A token contract with this symbol already exists"
        );

        Promise::new(env::current_account_id())
            .create_account()
            .transfer(attached_deposit)
            .deploy_contract(NFT_WASM_CODE.to_vec())
            .function_call(
                "new".into(),
                serde_json::to_vec(&args).expect("Failed to serialize init args"),
                0,
                GAS_FOR_NFT_DEPLOYMENT,
            )
    }
}

// Default for serialization error handling
impl Default for TokenArgs {
    fn default() -> Self {
        Self { 
            owner_id: env::current_account_id(), 
            metadata: NFTContractMetadata { 
                spec: "nft-1.0.0".into(), 
                name: "Default".into(), 
                symbol: "DEF".into(), 
                icon: None, 
                base_uri: None, 
                reference: None, 
                reference_hash: None,
            },
        }
    }
}
