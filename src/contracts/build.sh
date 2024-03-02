#!/bin/bash
set -e

# Build the NFT contract
echo "Building NFT contract..."
pushd nft
./build.sh

# Check if the build was successful
if [ $? -ne 0 ]; then
  echo ">> Error building NFT contract"
  exit 1
fi

# Navigate back to the contracts directory
popd

# Build the factory contract
echo "Building Token Factory contract..."
pushd factory
./build.sh

# Check if the build was successful
if [ $? -ne 0 ]; then
  echo ">> Error building Token Factory contract"
  exit 1
fi

# Deploy the factory contract to its sub-account
echo ">> Deploying Token Factory contract to factory.ethprince.testnet"
near deploy ethprince.testnet ./target/wasm32-unknown-unknown/release/token_factory.wasm

# Navigate back to the contracts directory
popd
