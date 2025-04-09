import {
    AlertDialog,
    AlertDialogAction,
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
          <Button variant="outline">Approve Request</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
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