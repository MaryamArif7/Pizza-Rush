/* eslint-disable react/prop-types */
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

function MenuDialog({ open, setOpen, menuDetails }) {
  console.log(
    "Menu Details in MenuDialog checking if parent to child values are being passed:",
    menuDetails
  );
console.log(menuDetails?.name);
console.log(menuDetails?.ingridents);
console.log(menuDetails?.ingridents?.toppings);
//menuDeatils logged the details but not the above because name etc is not direclty inside of a obj but its inside of obj then data
const details=menuDetails?.data;
console.log("Image URL:", menuDetails?.data?.image);

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
    <DialogContent 
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:p-8 lg:p-12 bg-black bg-opacity-70 rounded-lg max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]"
      role="dialog"
    >
      <div className="flex justify-center items-center">
        <img
          src={`http://localhost:5000/${details?.image}`}
          alt={details?.name}
          className="rounded-lg shadow-lg max-w-full max-h-[300px] object-cover"
        />
      </div>
  
      <div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-400 via-red-500 to-orange-500 text-transparent bg-clip-text mb-4">
          {details?.name}
        </h1>
        <p className="text-lg text-yellow-600 mb-5 leading-relaxed">
          {details?.description}
        </p>
        <div className="flex flex-wrap gap-5 items-center mb-5">
          <div className="flex gap-2 items-center">
            <h2 className="text-xl bg-gradient-to-r from-yellow-400 via-red-500 to-orange-500 text-transparent bg-clip-text">
              Size:
            </h2>
            <span className="text-yellow-600 text-lg">{details?.size}</span>
          </div>
          <div className="flex gap-2 items-center">
            <h2 className="text-xl bg-gradient-to-r from-yellow-400 via-red-500 to-orange-500 text-transparent bg-clip-text">
              Price:
            </h2>
            <span className="text-yellow-600 text-lg">{details?.price}</span>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-orange-500 text-transparent bg-clip-text mb-3">
            Ingredients
          </h2>
          <p className="text-lg font-medium text-yellow-600">
            <strong>Base:</strong> {details?.ingridents?.base}
          </p>
          <h1 className="text-xl text-yellow-600">Toppings</h1>
          <ul className="list-disc ml-5 mt-3 text-yellow-600">
            {details?.ingridents?.toppings?.map((topping, index) => (
              <li key={index} className="text-lg">{topping}</li>
            ))}
          </ul>
        </div>
      </div>
    </DialogContent>
  </Dialog>
  
  );
}

export default MenuDialog;
