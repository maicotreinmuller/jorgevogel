import { useState } from "react";
import InputMask from "react-input-mask";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AddressFields } from "./AddressFields";
import { PersonalFields } from "./PersonalFields";

interface ClientFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  onSubmitSuccess?: () => void;
}

const ClientForm = ({ onSubmit, initialData, onSubmitSuccess }: ClientFormProps) => {
  const [formData, setFormData] = useState(initialData || {
    name: "",
    document: "",
    phone: "",
    email: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const fetchAddress = async (cep: string) => {
    try {
      const cleanCep = cep.replace(/\D/g, "");
      if (cleanCep.length === 8) {
        const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);
        if (!response.data.erro) {
          setFormData((prev: any) => ({
            ...prev,
            street: response.data.logradouro,
            neighborhood: response.data.bairro,
            city: response.data.localidade,
            state: response.data.uf,
          }));
          toast.success("CEP encontrado!");
        } else {
          toast.error("CEP não encontrado. Por favor, preencha manualmente.");
        }
      }
    } catch (error) {
      toast.error("Erro ao buscar CEP. Por favor, preencha manualmente.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PersonalFields formData={formData} handleInputChange={handleInputChange} />
      <AddressFields formData={formData} handleInputChange={handleInputChange} fetchAddress={fetchAddress} />
      <Button type="submit" className="w-full">
        {initialData ? "Atualizar" : "Cadastrar"}
      </Button>
    </form>
  );
};

export default ClientForm;
