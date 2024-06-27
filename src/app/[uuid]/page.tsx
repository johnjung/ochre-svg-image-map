import ImageMap from "@/components/imageMap";

export default function Page({ params }: { params: { uuid: string } }) {
  return <ImageMap uuid={params.uuid} />;
}
