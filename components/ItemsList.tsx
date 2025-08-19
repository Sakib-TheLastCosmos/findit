// app/components/ItemList.tsx
import React from 'react';
import ItemCard from './ItemCard';

interface Item {
  title: string;
  description: string;
  location?: string;
  date?: string;
  imageUrl?: string;
  status?: string;
}

interface ItemListProps {
  items: Item[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <p className="text-gray-400 text-center mt-8">
        No items found.
      </p>
    );
  }

  return (
    <div className="mt-8 grid justify-center gap-6 px-8 py-6
                    grid-cols-1 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((item, idx) => (
        <div key={idx} className="flex justify-center">
          <ItemCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default ItemList;
