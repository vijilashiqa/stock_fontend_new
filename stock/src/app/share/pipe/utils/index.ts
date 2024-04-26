import { TaxPipe } from "../tax-calucator/tax.pipe";
export const tax = (
    tax_percentage: number = 18,
    amount: number = 0,
    tax_mode: number = 0
): number => {
    // console.log("tax %%%%%%" ,tax_percentage);
    // console.log("amount $$$$$$4444",amount);
    // console.log("tax mode @@@@@@@@",tax_mode)
    let tax_amt: number = 0;
    if (tax_mode === 0) { //inclusive
     tax_amt = (amount * tax_percentage) / (100 + tax_percentage);
       console.log("tax pipe in inclusive",tax_amt);
       
    } else { //exclusive
   tax_amt = (amount / 100) * tax_percentage ;
        console.log("tax pipe in exclusve",tax_amt);
    }
    return   Math.round(tax_amt)
};



// if (itemtaxtype == 0) {
//   let  taxamt = (amount * taxper) / (100 + taxper);
//   let amt = Number(amount) - Number(taxamt)
//     return { amt: amt.toFixed(3), taxamt: taxamt.toFixed(3) };
//   } else {
//     // Exclusive
//     let amt = Number(amount);
//    let taxamt = (amount / 100) * taxper;
    
//     return { amt:amt.toFixed(3), taxamt:taxamt.toFixed(3)};
//   }