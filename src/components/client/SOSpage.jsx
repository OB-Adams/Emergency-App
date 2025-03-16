import Image from "next/image";
import michaelSOS from "../../../public/images/sosButton.png"
import { Button } from "../ui/button";

export default function SOSpage() {
  return (
    <div className="flex flex-col justify-center" >
        <h5>
            Help is just a click away! Login to get started!
        </h5>
        <Image
            src={michaelSOS}
            alt="picture here"
        />
        <div>
            <Button className= {""}>Sign Up</Button>
            <Button 
                className= {""}
            /> 
        </div>
    </div>
  )
}
