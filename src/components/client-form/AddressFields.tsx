
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { ClientFormData } from "./types";

interface AddressFieldsProps {
  form: UseFormReturn<ClientFormData>;
  sameAddress: boolean;
  onSameAddressChange: (checked: boolean) => void;
}

const AddressFields = ({ form, sameAddress, onSameAddressChange }: AddressFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="legalAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Юридический адрес</FormLabel>
            <FormControl>
              <Input placeholder="Введите юридический адрес" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-2">
        <FormField
          control={form.control}
          name="actualAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Фактический адрес</FormLabel>
              <div className="space-y-2">
                <FormControl>
                  <Input 
                    placeholder="Введите фактический адрес" 
                    {...field} 
                    disabled={sameAddress} 
                  />
                </FormControl>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="same-address" 
                    checked={sameAddress} 
                    onCheckedChange={onSameAddressChange} 
                  />
                  <label 
                    htmlFor="same-address"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Same as legal address
                  </label>
                </div>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default AddressFields;
