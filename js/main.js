function startOver(){
  document.loan_form.loan_amt.value="";
  document.loan_form.months.value = "";
  document.loan_form.rate.value="";
  document.loan_form.extra.value="0";

  document.getElementById("table").innerHTML = "";
  document.getElementById("loan_info").innerHTML ="";
}

function validate(){
  let loan_amt = document.loan_form.loan_amt.value,
      months = document.loan_form.months.value,
      rate = document.loan_form.rate.value,
      extra = document.loan_form.extra.value;

  if (loan_amt <= 0  || isNaN(Number(loan_amt))){
    alert("Please enter a valid loan amount.");
    document.loan_form.loan_amt.value="";
  } else if (months <= 0 || parseInt(months) != months){
    alert("Please enter a valid number of months.");
     document.loan_form.months.value ="";
  } else if (rate <= 0 || isNaN(Number(rate))){
    alert("Please enter a valid interest rate");
    document.loan_form.rate.value = "";
  } else if (extra < 0 || isNaN(Number(extra))){
    alert("Please enter a valid extra payment");
    document.loan_form.extra.value = "0";
  } else{
    // all the data has been validated

    calculate(parseFloat(loan_amt), parseInt(months), parseFloat(rate), parseFloat(extra));
  }
}

function calculate(loan_amt, months, rate, extra){
    i = rate/100;

    let monthly_payment = loan_amt * (i/12) * Math.pow((1 + i/12), months) / (Math.pow((1 + i/12), months) - 1);

    let info = "";

    info += "<table>";
    info += "<tr><td>Loan Amount:</td>";
    info += "<td align='right'>$" + loan_amt + "</td></tr>";

    info += "<tr><td>Number of Months:</td>";
    info += "<td align='right'>" + months + "</td></tr>";

    info += "<tr><td>Interest Rate:</td>";
    info += "<td align='right'>" + rate + "%</td></tr>";

    info += "<tr><td>Monthly Payment:</td>";
    info += "<td align='right'>$" + round(monthly_payment, 2) + "</td></tr>";

    info += "<tr><td>+Extra:</td>";
    info += "<td align='right'>$" + extra + "</td></tr>";

    info += "<tr><td>Total Monthly Payment:</td>";
    info += "<td align='right'>$" + round(monthly_payment + extra, 2) + "</td></tr>";

    document.getElementById('loan_info').innerHTML = info; // info is a string containing all the HTML table code

    ////////////////////////////////////////////////////

    let table="";

    table +=  "<table class='table table-striped table-hover'>";
      table += "<tr>";
        table += "<th scope='row' style='width:10%'>0</th>";
        table += "<td style='width:16%'>&nbsp;</td>";
        table += "<td style='width:16%'>&nbsp;</td>";
        table += "<td style='width:16%'>&nbsp;</td>";
        table += "<td style='width:20%'>&nbsp;</td>";
        table += "<td style='width:20%'>" + round(loan_amt,2) + "</td>";
    table += "</tr>";

    let current_balance = loan_amt;
    let payment_counter = 1;
    let total_interest = 0;
    monthly_payment += extra;

  while(current_balance > 0){
    // create rows
    let toward_interest = (i/12) * current_balance; // this calculates the portion of monthly payment that goes toward the interest

    if (monthly_payment > current_balance){
      monthly_payment = current_balance + toward_interest;
    }

    let toward_balance = monthly_payment - toward_interest;
    total_interest += toward_interest;
    current_balance -= toward_balance;

    // diplay row
    table +="<tr>";
      table += "<th scope='row' style='width:10%;'>" + payment_counter + "</td>";
      table += "<td style='width:16%'>" + round(monthly_payment, 2) + "</td>";
      table += "<td style='width:16%'>" + round(toward_balance, 2) + "</td>";
      table += "<td style='width:16%'>" + round(toward_interest, 2) + "</td>";
      table += "<td style='width:20%'>" + round(total_interest, 2) + "</td>";
      table += "<td style='width:20%'>" + round(current_balance, 2) + "</td>";
    table += "</tr>";

    payment_counter++;
  }



  table += "</table>";

  document.getElementById("table").innerHTML = table;
}

function round(number, decimal_places){
  return(Math.round(number*Math.pow(10,decimal_places)) / Math.pow(10,decimal_places)).toFixed(decimal_places);
}
