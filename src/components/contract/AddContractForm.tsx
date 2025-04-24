
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/context/LocaleContext";

interface AddContractFormProps {
  onSubmit: (contractNumber: string, contractDate: string, numberOfApprovals?: string) => void;
  onCancel: () => void;
}

const AddContractForm = ({ onSubmit, onCancel }: AddContractFormProps) => {
  const { t } = useLocale();
  const [contractNumber, setContractNumber] = useState("");
  const [contractDate, setContractDate] = useState("");
  const [numberOfApprovals, setNumberOfApprovals] = useState<string>("");

  const handleSubmit = () => {
    if (contractNumber && contractDate) {
      onSubmit(
        contractNumber,
        contractDate,
        numberOfApprovals || undefined
      );
      setContractNumber("");
      setContractDate("");
      setNumberOfApprovals("");
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t("contractNumber")}</label>
          <input
            type="text"
            value={contractNumber}
            onChange={(e) => setContractNumber(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t("contractDate")}</label>
          <input
            type="date"
            value={contractDate}
            onChange={(e) => setContractDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t("numberOfApprovals")}</label>
          <input
            type="text"
            value={numberOfApprovals}
            onChange={(e) => setNumberOfApprovals(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>
            {t("cancel")}
          </Button>
          <Button onClick={handleSubmit}>
            {t("add")}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AddContractForm;
