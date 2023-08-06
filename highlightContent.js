

const getPlainText = (htmlContent) => {
  const plainText = htmlContent
    .replace(/<\/?[^>]+(>|$)/g, ' ')  
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')              
    .trim();

  return plainText;
};

function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
  let output = htmlContent;
  let count = 0;

  plainTextPositions.forEach(position => {
    // text at given position in 'plainText'
    const textContent = plainText.substring(position.start, position.end);

    // find the index of the above text in 'htmlContent'
    const startIndexInHTMLContent = htmlContent.indexOf(textContent, position.start);
    const diff = position.end - position.start;

    // update the start and end position acc. to the 'htmlContent'
    position.start = parseInt(startIndexInHTMLContent);
    position.end = position.start + diff;

    // logic to add mark tag at these given positions
    const newStart = position.start + 13 * count;
    const newEnd = position.end + 13 * count;

    // final result is getting stored in 'output'
    output = output.substring(0, newStart) + '<mark>' + output.substring(newStart, newEnd) + '</mark>' + output.substring(newEnd);
  
    count++;
  })

  return output;
}


const htmlContent = `<p><span>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar…<br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br>  <br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>`;


const plainTextPositions = [
  {
    start: 241,
    end: 247
  },
  {
    start: 518,
    end: 525,
  },
]

let plainText = getPlainText(htmlContent);
plainText = plainText.trim();

let ans = highlightHTMLContent(htmlContent, plainText, plainTextPositions);
console.log(ans)



module.exports =  highlightHTMLContent;