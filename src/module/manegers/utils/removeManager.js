export const handleRemove = (index ,{setDeleteIndex , setOpenDialog , field}) => {
    if (field.length > 1) {
      setDeleteIndex(index);
      setOpenDialog(true);
    }
  };