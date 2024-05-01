import Auth from "../components/Auth"
import Quote from "../components/Quote"

const Signup = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div className="">
        <Quote />
      </div>
      <div className="flex justify-center items-center mx-4">
        <Auth type="signup"/>
      </div>
    </div>
  )
}

export default Signup