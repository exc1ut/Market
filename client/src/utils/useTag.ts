import { useState } from 'react';

export const useTag = () => {
  const [tag, setTag] = useState<{ id: number; name: string }[]>([]);

  const handleAddTag = (id: number, name: string) => {
    const exist = tag.find((val) => val.id === id);
    console.log(exist);
    if (!exist && id) {
      setTag([...tag, { id, name }]);
    }
  };

  const handleDeleteTag = (id: number) => {
    const filtered = tag.filter((val) => val.id !== id);
    setTag(filtered);
  };

  return {
    tags: tag,
    handleAddTag,
    handleDeleteTag,
  };
};
