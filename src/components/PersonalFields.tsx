import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputMask from "react-input-mask";
import { formatDocument } from "@/utils/formatters";

interface PersonalFieldsProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PersonalFields = ({ formData, handleInputChange }: PersonalFieldsProps) => {
  const getMask = (value: string) => {
    const cleanValue = value?.replace(/\D/g, "") || "";
    return cleanValue.length <= 11 
      ? "999.999.999-99"
      : "99.999.999/9999-99";
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const formattedValue = value.length <= 11 
      ? value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4")
      : value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5");
    
    handleInputChange({
      ...e,
      target: {
        ...e.target,
        name: "document",
        value: formattedValue
      }
    });
  };

  return (
    <>
      <div>
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="document">CPF/CNPJ</Label>
        <Input
          id="document"
          name="document"
          value={formData.document}
          onChange={handleDocumentChange}
          placeholder="Digite CPF ou CNPJ"
          maxLength={18}
        />
      </div>

      <div>
        <Label htmlFor="phone">Telefone</Label>
        <InputMask
          mask="(99) 99999-9999"
          value={formData.phone}
          onChange={handleInputChange}
          maskChar={null}
        >
          {(inputProps: any) => (
            <Input
              {...inputProps}
              id="phone"
              name="phone"
            />
          )}
        </InputMask>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
};