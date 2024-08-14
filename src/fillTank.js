'use strict';

function fillTank(customer, fuelPrice, amount = Infinity) {
  const vehicle = customer.vehicle;
  const freeSpace = vehicle.maxTankCapacity - vehicle.fuelRemains;
  const canBuy = Math.floor((customer.money / fuelPrice) * 10 + 1e-10) / 10;
  const requiredAmount = Math.min(amount, freeSpace, canBuy);
  const roundedAmount = Math.floor(requiredAmount * 10 + 1e-10) / 10;

  if (roundedAmount < 2) {
    return;
  }

  customer.vehicle.fuelRemains += roundedAmount;

  const deduction = Math.round(roundedAmount * fuelPrice * 100) / 100;

  customer.money -= deduction;

  // Explicitly set small residual amounts to zero
  if (Math.abs(customer.money) < 0.03) {
    customer.money = 0;
  }
}

module.exports = { fillTank };
