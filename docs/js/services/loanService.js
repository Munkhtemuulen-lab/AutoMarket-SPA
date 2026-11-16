// 2.11: зээлийн аннуитет төлбөрийн demo тооцоолол
export function calculateLoan({price,downPercent,monthlyRatePercent,months}) {
  price = Number(price); downPercent = Number(downPercent);
  monthlyRatePercent = Number(monthlyRatePercent); months = Number(months);
  if (![price,downPercent,monthlyRatePercent,months].every(Number.isFinite) ||
      price <= 0 || downPercent < 0 || downPercent > 90 ||
      monthlyRatePercent < 0 || monthlyRatePercent > 20 || months < 1) return null;
  const downPayment = price * downPercent / 100;
  const principal = price - downPayment;
  const rate = monthlyRatePercent / 100;
  const monthly = rate === 0 ? principal/months : principal*rate/(1-Math.pow(1+rate,-months));
  const loanTotal = monthly*months;
  return {downPayment,principal,monthly,loanTotal,interestTotal:loanTotal-principal,total:loanTotal+downPayment};
}
