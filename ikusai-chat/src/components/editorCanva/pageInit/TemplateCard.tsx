import type { FC } from "react";
interface TemplateCard {
    img: string;
    title: string;
    description: string
};
const TemplateCard: FC<TemplateCard> =  ({ img, title, description }) => {
  return (
    <>
      <div
        className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-lg flex flex-col"
        style={{ backgroundImage: `url(${img})` }}
      ></div>
      <div>
        <p className="text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-normal">
          {title}
        </p>
        <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal">
          {description}
        </p>
      </div>
      </>
  );
}

export default TemplateCard;
