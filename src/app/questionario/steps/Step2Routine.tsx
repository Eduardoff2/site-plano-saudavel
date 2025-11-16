import { QuestionnaireData } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

interface StepProps {
  formData: Partial<QuestionnaireData>;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

export default function Step2Routine({ formData, updateFormData }: StepProps) {
  const toggleTrainingTime = (time: string) => {
    const current = formData.trainingTime || [];
    if (current.includes(time)) {
      updateFormData({ trainingTime: current.filter(t => t !== time) });
    } else {
      updateFormData({ trainingTime: [...current, time] });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Rotina e Hábitos</h2>
        <p className="text-gray-600">Como é seu dia a dia?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="sleepHours">Quantas horas você dorme por dia? *</Label>
          <Input
            id="sleepHours"
            type="number"
            placeholder="Ex: 7"
            value={formData.sleepHours || ''}
            onChange={(e) => updateFormData({ sleepHours: parseInt(e.target.value) })}
            required
            min="3"
            max="12"
            step="0.5"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sleepTime">Que horas você costuma dormir? *</Label>
          <Input
            id="sleepTime"
            type="time"
            value={formData.sleepTime || ''}
            onChange={(e) => updateFormData({ sleepTime: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Nível de estresse no dia a dia *</Label>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Baixo</span>
          <Slider
            value={[formData.stressLevel || 3]}
            onValueChange={(value) => updateFormData({ stressLevel: value[0] as any })}
            min={1}
            max={5}
            step={1}
            className="flex-1"
          />
          <span className="text-sm text-gray-600">Alto</span>
        </div>
        <p className="text-sm text-gray-500">Nível atual: {formData.stressLevel || 3}/5</p>
      </div>

      <div className="space-y-3">
        <Label>Nível de energia durante o dia *</Label>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Baixa</span>
          <Slider
            value={[formData.energyLevel || 3]}
            onValueChange={(value) => updateFormData({ energyLevel: value[0] as any })}
            min={1}
            max={5}
            step={1}
            className="flex-1"
          />
          <span className="text-sm text-gray-600">Alta</span>
        </div>
        <p className="text-sm text-gray-500">Nível atual: {formData.energyLevel || 3}/5</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="trainingDays">Quantos dias por semana você pode treinar? *</Label>
        <Input
          id="trainingDays"
          type="number"
          placeholder="Ex: 3"
          value={formData.trainingDays || ''}
          onChange={(e) => updateFormData({ trainingDays: parseInt(e.target.value) })}
          required
          min="0"
          max="7"
        />
      </div>

      <div className="space-y-3">
        <Label>Onde você prefere treinar? *</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="academia"
              checked={formData.trainingTime?.includes('academia')}
              onCheckedChange={() => toggleTrainingTime('academia')}
            />
            <Label htmlFor="academia" className="cursor-pointer">Academia</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="casa"
              checked={formData.trainingTime?.includes('casa')}
              onCheckedChange={() => toggleTrainingTime('casa')}
            />
            <Label htmlFor="casa" className="cursor-pointer">Casa</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="ar-livre"
              checked={formData.trainingTime?.includes('ar-livre')}
              onCheckedChange={() => toggleTrainingTime('ar-livre')}
            />
            <Label htmlFor="ar-livre" className="cursor-pointer">Ar livre (parque, rua)</Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Você já treina atualmente? *</Label>
        <RadioGroup
          value={formData.alreadyTrains?.toString()}
          onValueChange={(value) => updateFormData({ alreadyTrains: value === 'true' })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="trains-yes" />
            <Label htmlFor="trains-yes" className="cursor-pointer">Sim</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="trains-no" />
            <Label htmlFor="trains-no" className="cursor-pointer">Não</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.alreadyTrains && (
        <div className="space-y-2">
          <Label htmlFor="trainingDuration">Há quanto tempo você treina?</Label>
          <Input
            id="trainingDuration"
            type="text"
            placeholder="Ex: 6 meses, 2 anos"
            value={formData.trainingDuration || ''}
            onChange={(e) => updateFormData({ trainingDuration: e.target.value })}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Como você descreveria sua rotina? *</Label>
        <RadioGroup
          value={formData.activityLevel}
          onValueChange={(value: any) => updateFormData({ activityLevel: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sedentary" id="sedentary" />
            <Label htmlFor="sedentary" className="cursor-pointer">
              Sedentário (pouco ou nenhum exercício)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="moderate" id="moderate" />
            <Label htmlFor="moderate" className="cursor-pointer">
              Moderado (exercício 1-3x por semana)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="active" id="active" />
            <Label htmlFor="active" className="cursor-pointer">
              Ativo (exercício 4-7x por semana)
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Tipo de trabalho *</Label>
        <RadioGroup
          value={formData.workType}
          onValueChange={(value: any) => updateFormData({ workType: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sitting" id="sitting" />
            <Label htmlFor="sitting" className="cursor-pointer">
              Sentado (escritório, home office)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="standing" id="standing" />
            <Label htmlFor="standing" className="cursor-pointer">
              Em pé (vendedor, professor)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="physical" id="physical" />
            <Label htmlFor="physical" className="cursor-pointer">
              Esforço físico (construção, entregador)
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
