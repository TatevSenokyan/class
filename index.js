import { notesValidation, notesSummary, withdrawCheck } from "./functions/validate.js";

class CashDrawer {
    constructor () {
        this.notesStore = [];
    }
    deposit(notes) {
        if(notesValidation(notes)) {
           this.notesStore = notes;
        } else {
            try {
                throw new Error("Expected to be array of numbers with 5, 10, 25, 50, 100 notes")
            } catch (err) {
                console.log(err.message);
            }  
        }
    }

    peek() {
        return notesSummary(this.notesStore);
    }

    withdraw(amount) {
       const result = withdrawCheck(this.notesStore, amount, this.peek());
       if (result.length) {
          return `You can get ${amount} with ${JSON.stringify(result[0])} notes`;
       } else {
          return `Impossible the get ${amount}`;
       }
    }
}

const customer = new CashDrawer();

customer.deposit([10, 50, 100]);
console.log(customer.peek());
console.log(customer.withdraw(150));