import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface FormModalProps {
  title: string;
  children: React.ReactElement;
  triggerText: React.ReactNode;
}

const FormModal = ({ title, children, triggerText }: FormModalProps) => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const onOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const childrenWithProps = React.cloneElement(children, {
    onSubmitSuccess: () => setOpen(false),
  });

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>
          {typeof triggerText === 'string' ? <Button>{triggerText}</Button> : triggerText}
        </DrawerTrigger>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <ScrollArea className="h-full overflow-y-auto px-4 pb-8">
            {childrenWithProps}
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {typeof triggerText === 'string' ? <Button>{triggerText}</Button> : triggerText}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-8rem)] overflow-y-auto pr-4">
          {childrenWithProps}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;