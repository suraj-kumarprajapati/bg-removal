import { assets } from "../assets/assets";



const Footer = () => {
    return (
        <>
            <div className="flex items-center justify-between gap-4 px-4 lg:px-44 py-3">
                <img width={150} src={assets.logo} alt="" />
                <p className="text-sm text-gray-500 max-sm:hidden">All right reserved. Copyright @bg removal</p>
                <div className="flex gap-1">
                    <img width={40} src={assets.facebook_icon} alt="facebook" />
                    <img width={40} src={assets.twitter_icon} alt="twitter" />
                    <img width={40} src={assets.google_plus_icon} alt="google_plus" />
                </div>
            </div>
        </>
    )
}

export default Footer;