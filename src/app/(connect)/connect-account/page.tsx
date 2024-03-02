import SignInButton from '@/lib/components/NearConnect';

export default function ConnectPage() {
  return (
    <div
      style={{
        background:
          'url("https://img.freepik.com/free-vector/blue-fluid-background-frame_53876-99019.jpg?w=900&t=st=1709394552~exp=1709395152~hmac=cd670c77793d17f5dab718c49202dd16cdc290aa7d8a9619cacd0d266cc5434d") center center / cover no-repeat',
        padding: '50px', // Example padding, adjust as needed
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center">
        <SignInButton />
      </div>
    </div>
  );
}
