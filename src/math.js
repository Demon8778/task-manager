const calculateTip = (total, tipPercent) => {
	const tip = total * tipPercent;
	return tip + total;
};

module.exports = {
	calculateTip
};
