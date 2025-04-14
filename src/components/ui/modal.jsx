import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "../../components/ui/alert-dialog"
  import { Button } from "../../components/ui/button"
import { useState } from "react"
   
  export function Modal() {
    const [modalOpened, setModalOpened] = useState(false)

    return (
      <AlertDialog >
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="bg-green-400">Approve Request</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className= "bg-gray-300">
          <img src ="/icons/Bell.png" className="mx-auto mb-2 h-8 w-8"/>
          <AlertDialogHeader>
            <AlertDialogTitle>Request approved</AlertDialogTitle>
              </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }