import PropTypes from "prop-types";
import "./Item.scss";

const Item = (props) => {
    const { title, amount } = props;
    const status = amount < 0 ? "expense" : "income";
    const symbol = amount < 0 ? "-" : "+";
    const formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };
    return (
        <li className={status}>
            {title}
            <span></span>
            {symbol}
            {formatNumber(Math.abs(amount).toFixed(2))}
        </li>
    );
};

Item.propTypes = {
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
};
export default Item;
