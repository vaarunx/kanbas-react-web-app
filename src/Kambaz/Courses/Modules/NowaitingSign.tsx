import { CiNoWaitingSign } from "react-icons/ci";
import { FaCircle } from "react-icons/fa";
export default function NowaitinSign() {
    return (
        <span className="me-1 position-relative">
            <CiNoWaitingSign style={{ top: "2px" }} className="text-black text-success me-1 position-absolute fs-5" />
            <FaCircle className="text-white me-1 fs-6" />
        </span>);
}