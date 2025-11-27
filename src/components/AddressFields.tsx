import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputMask from "react-input-mask";

interface AddressFieldsProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fetchAddress: (cep: string) => Promise<void>;
}

export const AddressFields = ({ formData, handleInputChange, fetchAddress }: AddressFieldsProps) => {
  return (
    <>
      <div>
        <Label htmlFor="cep">CEP</Label>
        <InputMask
          mask="99999-999"
          value={formData.cep}
          onChange={handleInputChange}
          onBlur={(e) => fetchAddress(e.target.value)}
        >
          {(inputProps: any) => (
            <Input
              {...inputProps}
              id="cep"
              name="cep"
            />
          )}
        </InputMask>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="street">Rua</Label>
          <Input
            id="street"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="number">Número</Label>
          <Input
            id="number"
            name="number"
            value={formData.number}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="complement">Complemento</Label>
        <Input
          id="complement"
          name="complement"
          value={formData.complement}
          onChange={handleInputChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="neighborhood">Bairro</Label>
          <Input
            id="neighborhood"
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="city">Cidade</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="state">Estado</Label>
          <Input
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </>
  );
};