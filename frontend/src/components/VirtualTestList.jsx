import * as ReactWindow from "react-window";

const List = ReactWindow.FixedSizeList

export default function VirtualTestList({ items }) {
  return (
    <List height={400} itemCount={items.length} itemSize={50} width="100%">
      {({ index, style }) => (
        <div
          style={style}
          className="flex justify-between px-4 items-center border-b"
        >
          <span>{items[index].title}</span>
          <span className="text-sm text-slate-500">
            {items[index].priority}
          </span>
        </div>
      )}
    </List>
  );
}
