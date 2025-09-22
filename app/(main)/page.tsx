import { PostDrawer } from "@/features/post/components/post-drawer";

export default function Home() {
  return (
    <div className="h-full">
      <div className="z-10 absolute bottom-20 right-2">
        <PostDrawer />
      </div>
    </div>
  );
}
