import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { formatCurrency, parseCurrency } from "@/utils/formatters";

interface PurchaseFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  onSubmitSuccess?: () => void;
}

const PurchaseForm = ({ onSubmit, initialData, onSubmitSuccess }: PurchaseFormProps) => {
  const [formData, setFormData] = useState(initialData || {
    date: new Date().toISOString().split('T')[0],
    supplier: "",
    document: "",
    invoiceNumber: "",
    product: "",
    description: "",
    value: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "value") {
      const numericValue = value.replace(/\D/g, "");
      const formattedValue = formatCurrency(Number(numericValue) / 100);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else if (name === "document") {
      const cleanValue = value.replace(/\D/g, "");
      const formattedValue = cleanValue.length <= 11 
        ? cleanValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4")
        : cleanValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5");
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      value: parseCurrency(formData.value),
      date: new Date(formData.date)
    };
    onSubmit(submitData);
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="date">Data</Label>
        <Input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="supplier">Fornecedor</Label>
        <Input
          id="supplier"
          name="supplier"
          value={formData.supplier}
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
          onChange={handleInputChange}
          required
          placeholder="Digite CPF ou CNPJ"
          maxLength={18}
        />
      </div>

      <div>
        <Label htmlFor="invoiceNumber">Nota Fiscal</Label>
        <Input
          id="invoiceNumber"
          name="invoiceNumber"
          value={formData.invoiceNumber}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="product">Produto</Label>
        <Input
          id="product"
          name="product"
          value={formData.product}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="value">Valor</Label>
        <Input
          id="value"
          name="value"
          value={formData.value}
          onChange={handleInputChange}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        {initialData ? "Atualizar" : "Cadastrar"}
      </Button>
    </form>
  );
};

export default PurchaseForm;