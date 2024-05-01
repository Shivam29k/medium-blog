import Auth from "../components/Auth"
import Quote from "../components/Quote"

function Signin() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div className=" lg:block">
        <Quote />
      </div>
      <div className="flex justify-center items-center mx-4">
        <Auth type="signin"/>
      </div>
    </div>
  )
}

export default Signin