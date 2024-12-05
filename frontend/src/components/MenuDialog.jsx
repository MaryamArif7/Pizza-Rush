/* eslint-disable react/prop-types */
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

function MenuDialog({ open, setOpen, menuDetails }) {
  console.log(
    "Menu Details in MenuDialog checking if parent to child values are being passed:",
    menuDetails
  );

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]"
        role="dialog"
      >
        <DialogTitle>Menu Details</DialogTitle>
        <div className="relative rounded-lg">
          <img
            src={menuDetails?.image}
            alt={menuDetails?.name}
            width={200}
            height={200}
          />
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-red-600">
            {menuDetails?.name}
          </h1>
          <p className="text-muted-foreground text-2xl mb-5 mt-1">
            {menuDetails?.description}
          </p>
          <h1>{menuDetails?.size}</h1>
          <h1>{menuDetails?.price}</h1>

          <div className="mt-6">
            <h2 className="text-2xl font-bold">Ingredients</h2>
            <p className="text-lg font-medium mt-2">
              <strong>Base:</strong> {menuDetails?.ingridents?.base}
            </p>
            <ul className="list-disc ml-5 mt-2">
              {menuDetails?.ingridents?.toppings?.map((topping, index) => (
                <li key={index} className="text-lg">
                  {topping}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MenuDialog;
