$('#btnCalc').click(()=>{
    let text=$('#inputText').val();
    let words=getWords(text);
    let wc=getWordsCount(words);
    let wcArr=sortWordCounts(wc);
    printWordTable(wcArr);
    generateChart(wcArr);
});

function getWords(inputText){
    let chars=inputText.split('');
    let newChars=[];
    chars.forEach((c) => {
        switch (c) {
            case `.` : case `,` : case `'` : case `"` : case `-` : case `_` : 
            case `@` : case `/` : case `:` : case `;` : case `!` : case `(` : case `)` :
            case `?` : return
            case '\n' : newChars.push(' '); break; 
            case '  ' : newChars.push(' '); break; 
            case '   ': newChars.push(' '); break; 
            default :
                newChars.push(c.toLowerCase());
        }
    });
    let newText=newChars.join('');
    let words=newText.split(' ');
    return words;
}

function getWordsCount(words){
    let wordsCount={};
    words.forEach((w)=>{
        if(wordsCount[w]){
            wordsCount[w]++;
        }
        else {
            wordsCount[w]=1;
        }
    });
    return wordsCount;
}

function sortWordCounts(wordsCount){
    let wcArr=[];
    Object.keys(wordsCount).forEach((w)=>{
        if(w == "")
            return ;
        wcArr.push({
            word : w,
            count : wordsCount[w]
        });
    });
    return wcArr.sort((a,b)=>b.count - a.count).slice(0,50);
}

function printWordTable(wordCountArray){
    let table=$('#tblWordCount');
    table.empty();
    wordCountArray.forEach((wc)=>{
        table.append(
            $('<tr>')
                .append($('<td>').text(wc.word))
                .append($('<td>').text(wc.count))
            
            );
    })
}

function generateChart(wcArr){
    let ctx = document.getElementById('myChart').getContext('2d');
    
    let zipsLaw = [];
    for (let i = 0; i < 50; i++) {
        zipsLaw[i] = (1 / (i + 1)) * wcArr[0].count;
    }
    let chart= new Chart(ctx, {
        type: 'line',
    
        data: {
            labels: wcArr.map((wc) => wc.word),
            datasets: [
            {
                label: 'Word Frequency',
                
                borderColor: '#123c69',
                backgroundColor: 'rgb(0, 5, 205,.2)',
                hoverBackgroundColor: 'white',
                pointBackgroundColor:'yellow',
                data: wcArr.map((wc) => wc.count)
            },
            {
                label: "Zipf's Law",
                borderColor:'#9a1750',
                backgroundColor: 'rgb(255, 5, 1,.3)',
                hoverBackgroundColor: 'white',
                // borderWidth: 2,
                pointStyle:'circle',
                pointBackgroundColor:'red',
                

                data: zipsLaw
              }
        ]
            
        }
       
       
    });
}

