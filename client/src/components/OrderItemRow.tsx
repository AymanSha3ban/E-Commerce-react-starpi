
export default function OrderItemRow({ item }: { item: any }) {
  const product = item.product;
  const title = product?.title || `Product #${item.id}`;
  console.log(product);
  const price = item.unitPrice ?? product?.price ?? 0;
  const itemTotal = price * (item.quantity || 1);

  const imagePath =
    product?.thumbnail?.url ||
    product?.thumbnail?.formats?.thumbnail?.url ||
    product?.image?.url;

  const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:1337";
  const imgUrl = imagePath
    ? imagePath.startsWith("http")
      ? imagePath
      : `${serverUrl}${imagePath}`
    : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1770&q=80";

    console.log(product);
  return (
    <div className="p-4 sm:p-6 flex items-center justify-between gap-4 hover:bg-muted/30 transition-colors border-b border-border last:border-0">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl bg-muted overflow-hidden border border-border shrink-0 flex items-center justify-center">
          <img
            src={imgUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold text-base line-clamp-1">{title}</h4>
          <p className="text-sm text-muted-foreground">
            ${price.toFixed(2)} × {item.quantity}
          </p>
        </div>
      </div>
      <div className="text-right font-bold text-base">
        ${itemTotal.toFixed(2)}
      </div>
    </div>
  );
}


