import { QuestionnaireData } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

interface StepProps {
  formData: Partial<QuestionnaireData>;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

export default function Step3Nutrition({ formData, updateFormData }: StepProps) {
  const toggleRestriction = (restriction: string) => {
    const current = formData.dietaryRestrictions || [];
    if (current.includes(restriction)) {
      updateFormData({ dietaryRestrictions: current.filter(r => r !== restriction) });
    } else {
      updateFormData({ dietaryRestrictions: [...current, restriction] });
    }
  };

  const toggleSupplement = (supplement: string) => {
    const current = formData.supplements || [];
    if (current.includes(supplement)) {
      updateFormData({ supplements: current.filter(s => s !== supplement) });
    } else {
      updateFormData({ supplements: [...current, supplement] });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Alimentação</h2>
        <p className="text-gray-600">Seus hábitos alimentares</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mealsPerDay">Quantas refeições você faz por dia? *</Label>
        <Input
          id="mealsPerDay"
          type="number"
          placeholder="Ex: 4"
          value={formData.mealsPerDay || ''}
          onChange={(e) => updateFormData({ mealsPerDay: parseInt(e.target.value) })}
          required
          min="2"
          max="8"
        />
        <p className="text-sm text-gray-500">Inclua lanches e refeições principais</p>
      </div>

      <div className="space-y-3">
        <Label>Você tem alguma restrição alimentar?</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="lactose"
              checked={formData.dietaryRestrictions?.includes('lactose')}
              onCheckedChange={() => toggleRestriction('lactose')}
            />
            <Label htmlFor="lactose" className="cursor-pointer">Intolerância à lactose</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="gluten"
              checked={formData.dietaryRestrictions?.includes('gluten')}
              onCheckedChange={() => toggleRestriction('gluten')}
            />
            <Label htmlFor="gluten" className="cursor-pointer">Intolerância ao glúten</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="nuts"
              checked={formData.dietaryRestrictions?.includes('nuts')}
              onCheckedChange={() => toggleRestriction('nuts')}
            />
            <Label htmlFor="nuts" className="cursor-pointer">Alergia a oleaginosas (castanhas, amendoim)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="seafood"
              checked={formData.dietaryRestrictions?.includes('seafood')}
              onCheckedChange={() => toggleRestriction('seafood')}
            />
            <Label htmlFor="seafood" className="cursor-pointer">Alergia a frutos do mar</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="none"
              checked={formData.dietaryRestrictions?.includes('none')}
              onCheckedChange={() => toggleRestriction('none')}
            />
            <Label htmlFor="none" className="cursor-pointer">Nenhuma restrição</Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Preferência alimentar *</Label>
        <RadioGroup
          value={formData.dietPreference}
          onValueChange={(value: any) => updateFormData({ dietPreference: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="free" id="free" />
            <Label htmlFor="free" className="cursor-pointer">
              Livre (como de tudo)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vegetarian" id="vegetarian" />
            <Label htmlFor="vegetarian" className="cursor-pointer">
              Vegetariana (sem carne)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="low_carb" id="low_carb" />
            <Label htmlFor="low_carb" className="cursor-pointer">
              Low Carb (baixo carboidrato)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other" className="cursor-pointer">
              Outra (especifique abaixo)
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="waterIntake">Quantos litros de água você bebe por dia? *</Label>
        <Input
          id="waterIntake"
          type="number"
          placeholder="Ex: 2"
          value={formData.waterIntake || ''}
          onChange={(e) => updateFormData({ waterIntake: parseFloat(e.target.value) })}
          required
          min="0"
          max="10"
          step="0.5"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dietHistory">Histórico de dietas</Label>
        <Textarea
          id="dietHistory"
          placeholder="Já fez alguma dieta antes? Como foi? (Ex: Fiz low carb por 3 meses, perdi 5kg mas voltei a ganhar)"
          value={formData.dietHistory || ''}
          onChange={(e) => updateFormData({ dietHistory: e.target.value })}
          rows={4}
        />
      </div>

      <div className="space-y-3">
        <Label>Você consome suplementos atualmente?</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="whey"
              checked={formData.supplements?.includes('whey')}
              onCheckedChange={() => toggleSupplement('whey')}
            />
            <Label htmlFor="whey" className="cursor-pointer">Whey Protein</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="creatine"
              checked={formData.supplements?.includes('creatine')}
              onCheckedChange={() => toggleSupplement('creatine')}
            />
            <Label htmlFor="creatine" className="cursor-pointer">Creatina</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="bcaa"
              checked={formData.supplements?.includes('bcaa')}
              onCheckedChange={() => toggleSupplement('bcaa')}
            />
            <Label htmlFor="bcaa" className="cursor-pointer">BCAA</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="multivitamin"
              checked={formData.supplements?.includes('multivitamin')}
              onCheckedChange={() => toggleSupplement('multivitamin')}
            />
            <Label htmlFor="multivitamin" className="cursor-pointer">Multivitamínico</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="omega3"
              checked={formData.supplements?.includes('omega3')}
              onCheckedChange={() => toggleSupplement('omega3')}
            />
            <Label htmlFor="omega3" className="cursor-pointer">Ômega 3</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="no-supplements"
              checked={formData.supplements?.includes('none')}
              onCheckedChange={() => toggleSupplement('none')}
            />
            <Label htmlFor="no-supplements" className="cursor-pointer">Não consumo suplementos</Label>
          </div>
        </div>
      </div>
    </div>
  );
}
