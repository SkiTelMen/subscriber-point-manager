
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useClients } from "@/context/ClientContext";
import { useLocale } from "@/context/LocaleContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PlusCircle } from "lucide-react";
import { getFutureDate } from "@/utils/dateUtils";
import { createDefaultSubscriberPoint } from "@/utils/subscriberPointUtils";

const subscriberPointSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  networkNumber: z.string().min(1, { message: "Network number is required" }),
  validityDate: z.string().refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime());
  }, { message: "Please enter a valid date" }),
  type: z.enum(['Coordinator', 'Client'], { required_error: "Type is required" })
});

type SubscriberPointFormData = z.infer<typeof subscriberPointSchema>;

interface SubscriberPointFormProps {
  clientId: string;
  contractId: string;
}

const SubscriberPointForm = ({ clientId, contractId }: SubscriberPointFormProps) => {
  const { addSubscriberPoint } = useClients();
  const { t } = useLocale();
  
  const defaultPoint = createDefaultSubscriberPoint();
  
  const form = useForm<SubscriberPointFormData>({
    resolver: zodResolver(subscriberPointSchema),
    defaultValues: {
      name: "",
      networkNumber: "",
      validityDate: defaultPoint.validityDate || getFutureDate(365),
      type: defaultPoint.type || 'Coordinator'
    },
  });

  const onSubmit = (data: SubscriberPointFormData) => {
    addSubscriberPoint(
      clientId,
      contractId,
      data.name,
      data.networkNumber,
      data.validityDate,
      data.type
    );
    
    // Reset form with default values
    form.reset({
      name: "",
      networkNumber: "",
      validityDate: getFutureDate(365),
      type: 'Coordinator'
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h4 className="text-sm font-medium">{t("addSubscriberPoint")}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("subscriberPointName")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("subscriberPointName")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="networkNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("networkNumber")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("networkNumber")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("type")}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("selectType")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Coordinator">{t("Coordinator")}</SelectItem>
                    <SelectItem value="Client">{t("Client")}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="validityDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("validityDate")}</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" size="sm" className="mt-2">
            <PlusCircle className="w-4 h-4 mr-2" />
            {t("addSubscriberPoint")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SubscriberPointForm;
