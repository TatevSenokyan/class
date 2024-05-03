export const notesValidation = (notes) => {
    if (!Array.isArray(notes)) return false;
    const validNotes = [5, 10, 25, 50, 100];
    return notes.reduce((aggr, note) => {
      if (validNotes.indexOf(note) === -1) aggr = false;
      return aggr;
    }, true);
}

export const notesSummary = (notes) => {
    return notes.reduce((aggr, note) => {
      note in aggr ? aggr[note] += 1 : aggr[note] = 1;
      return aggr;
    }, {});
}

export const withdrawCheck = (notes, amount, notesSum) => {
        const memo = {};
        function allCombinations (start, amount) {
            if (memo[amount]) return memo[amount];
            if (amount === 0) return [[]];
            if (amount < 0)  return [];
            
            const res = [];
            for (let i = start; i < notes.length; i++) {
                const note = notes[i];
                if (amount - note >= 0) {
                    for (const comb of allCombinations(i, amount - note)) {
                        res.push([note, ...comb]);
                    }
                }
            }
            memo[amount] = res;
            return res;
        }
    
        const possibleArrays = allCombinations(0, amount);
        
        return possibleArrays.reduce((aggr, arr) => {
           const res = notesSummary(arr);
           let check = true;
           
           Object.keys(res).forEach((key)=>{
               if(res[key]>notesSum[key]) {
                  check = false;
               }
           })
            
           if (check) aggr.push(arr);
            return aggr;
            
        }, []);
    }