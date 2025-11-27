import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { formatCurrency, parseCurrency } from "@/utils/formatters";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/db/database";

interface ServiceOrderFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  lastOrderNumber: number;
  onSubmitSuccess?: () => void;
}

const ServiceOrderForm = ({ onSubmit, initialData, lastOrderNumber, onSubmitSuccess }: ServiceOrderFormProps) => {
  const [formData, setFormData] = useState(initialData || {
    orderNumber: (lastOrderNumber + 1).toString(),
    clientId: "",
    product: "",
    description: "",
    observation: "",
    priority: "normal",
    status: "pending",
    value: "",
  });

  const { data: clients = [] } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => await db.clients.toArray()
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "value") {
      const numericValue = value.replace(/\D/g, "");
      const formattedValue = formatCurrency(Number(numericValue) / 100);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const clientExists = await db.clients.get(Number(formData.clientId));
    if (!clientExists) {
      toast.error("Cliente não encontrado!");
      return;
    }

    const submitData = {
      ...formData,
      clientId: Number(formData.clientId),
      value: parseCurrency(formData.value || "0"),
      clientName: clientExists.name
    };
    
    onSubmit(submitData);
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="orderNumber">Nº OS</Label>
        <Input
          id="orderNumber"
          name="orderNumber"
          value={formData.orderNumber}
          disabled
        />
      </div>

      <div>
        <Label htmlFor="clientId">Cliente</Label>
        <Select
          value={formData.clientId.toString()}
          onValueChange={(value) => setFormData(prev => ({ ...prev, clientId: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione um cliente" />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id?.toString()}>
                {client.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
        <Label htmlFor="observation">Observação</Label>
        <Textarea
          id="observation"
          name="observation"
          value={formData.observation}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <Label htmlFor="priority">Prioridade</Label>
        <Select
          value={formData.priority}
          onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Baixa</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="high">Alta</SelectItem>
            <SelectItem value="urgent">Urgente</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="in_progress">Em Andamento</SelectItem>
            <SelectItem value="completed">Concluída</SelectItem>
            <SelectItem value="cancelled">Cancelada</SelectItem>
          </SelectContent>
        </Select>
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

export default ServiceOrderForm;
