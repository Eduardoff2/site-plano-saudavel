import { QuestionnaireData } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface StepProps {
  formData: Partial<QuestionnaireData>;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

export default function Step1Physical({ formData, updateFormData }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dados Físicos</h2>
        <p className="text-gray-600">Informações básicas sobre seu corpo</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="age">Idade *</Label>
          <Input
            id="age"
            type="number"
            placeholder="Ex: 25"
            value={formData.age || ''}
            onChange={(e) => updateFormData({ age: parseInt(e.target.value) })}
            required
            min="15"
            max="100"
          />
        </div>

        <div className="space-y-2">
          <Label>Sexo *</Label>
          <RadioGroup
            value={formData.gender}
            onValueChange={(value: any) => updateFormData({ gender: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male" className="cursor-pointer">Masculino</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female" className="cursor-pointer">Feminino</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other" className="cursor-pointer">Outro</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="height">Altura (cm) *</Label>
          <Input
            id="height"
            type="number"
            placeholder="Ex: 175"
            value={formData.height || ''}
            onChange={(e) => updateFormData({ height: parseInt(e.target.value) })}
            required
            min="100"
            max="250"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">Peso (kg) *</Label>
          <Input
            id="weight"
            type="number"
            placeholder="Ex: 70"
            value={formData.weight || ''}
            onChange={(e) => updateFormData({ weight: parseFloat(e.target.value) })}
            required
            min="30"
            max="300"
            step="0.1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bodyFat">Percentual de Gordura (%) - Opcional</Label>
        <Input
          id="bodyFat"
          type="number"
          placeholder="Ex: 20 (deixe em branco se não souber)"
          value={formData.bodyFat || ''}
          onChange={(e) => updateFormData({ bodyFat: parseFloat(e.target.value) || undefined })}
          min="5"
          max="60"
          step="0.1"
        />
        <p className="text-sm text-gray-500">Se você não sabe, pode deixar em branco</p>
      </div>

      <div className="space-y-2">
        <Label>Qual é seu objetivo principal? *</Label>
        <RadioGroup
          value={formData.goal}
          onValueChange={(value: any) => updateFormData({ goal: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lose_weight" id="lose_weight" />
            <Label htmlFor="lose_weight" className="cursor-pointer">Emagrecer / Perder gordura</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="gain_muscle" id="gain_muscle" />
            <Label htmlFor="gain_muscle" className="cursor-pointer">Ganhar massa muscular</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="maintain" id="maintain" />
            <Label htmlFor="maintain" className="cursor-pointer">Manter peso / Melhorar saúde</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Medidas Corporais (Opcional)</h3>
        <p className="text-sm text-gray-600 mb-4">Ajuda a personalizar ainda mais seu plano</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="arm">Braço (cm)</Label>
            <Input
              id="arm"
              type="number"
              placeholder="Ex: 35"
              value={formData.measurements?.arm || ''}
              onChange={(e) => updateFormData({ 
                measurements: { 
                  ...formData.measurements, 
                  arm: parseFloat(e.target.value) || undefined 
                } 
              })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="chest">Peito (cm)</Label>
            <Input
              id="chest"
              type="number"
              placeholder="Ex: 95"
              value={formData.measurements?.chest || ''}
              onChange={(e) => updateFormData({ 
                measurements: { 
                  ...formData.measurements, 
                  chest: parseFloat(e.target.value) || undefined 
                } 
              })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="waist">Cintura (cm)</Label>
            <Input
              id="waist"
              type="number"
              placeholder="Ex: 80"
              value={formData.measurements?.waist || ''}
              onChange={(e) => updateFormData({ 
                measurements: { 
                  ...formData.measurements, 
                  waist: parseFloat(e.target.value) || undefined 
                } 
              })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hip">Quadril (cm)</Label>
            <Input
              id="hip"
              type="number"
              placeholder="Ex: 95"
              value={formData.measurements?.hip || ''}
              onChange={(e) => updateFormData({ 
                measurements: { 
                  ...formData.measurements, 
                  hip: parseFloat(e.target.value) || undefined 
                } 
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
