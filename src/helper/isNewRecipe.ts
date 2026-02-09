const isNewRecipe = (createdAt: string) => {
  const createdDate = new Date(createdAt);
  const now = new Date();

  const diffInHours = (now.getTime() - createdDate.getTime()) / (100 * 60 * 60);

  return diffInHours <= 24;
};

export default isNewRecipe;
