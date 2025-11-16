import { QuestionnaireData } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

interface StepProps {
  formData: Partial<QuestionnaireData>;
  updateFormData: (data: Partial<QuestionnaireData>) => void;
}

export default function Step4Health({ formData, updateFormData }: StepProps) {
  const toggleHealthIssue = (issue: string) => {
    const current = formData.healthIssues || [];
    if (current.includes(issue)) {
      updateFormData({ healthIssues: current.filter(i => i !== issue) });
    } else {
      updateFormData({ healthIssues: [...current, issue] });
    }
  };

  const toggleMedication = (medication: string) => {
    const current = formData.medications || [];
    if (current.includes(medication)) {
      updateFormData({ medications: current.filter(m => m !== medication) });
    } else {
      updateFormData({ medications: [...current, medication] });
    }
  };

  const toggleSleepProblem = (problem: string) => {
    const current = formData.sleepProblems || [];
    if (current.includes(problem)) {
      updateFormData({ sleepProblems: current.filter(p => p !== problem) });
    } else {
      updateFormData({ sleepProblems: [...current, problem] });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Saúde Geral</h2>
        <p className="text-gray-600">Informações importantes sobre sua saúde</p>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <p className="text-sm text-yellow-800">
          <strong>Importante:</strong> Estas informações são confidenciais e serão usadas apenas para personalizar seu plano. 
          Sempre consulte um médico antes de iniciar qualquer programa de exercícios ou dieta.
        </p>
      </div>

      <div className="space-y-3">
        <Label>Você tem algum problema de saúde?</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="diabetes"
              checked={formData.healthIssues?.includes('diabetes')}
              onCheckedChange={() => toggleHealthIssue('diabetes')}
            />
            <Label htmlFor="diabetes" className="cursor-pointer">Diabetes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hypertension"
              checked={formData.healthIssues?.includes('hypertension')}
              onCheckedChange={() => toggleHealthIssue('hypertension')}
            />
            <Label htmlFor="hypertension" className="cursor-pointer">Pressão alta (hipertensão)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="heart"
              checked={formData.healthIssues?.includes('heart')}
              onCheckedChange={() => toggleHealthIssue('heart')}
            />
            <Label htmlFor="heart" className="cursor-pointer">Problemas cardíacos</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="thyroid"
              checked={formData.healthIssues?.includes('thyroid')}
              onCheckedChange={() => toggleHealthIssue('thyroid')}
            />
            <Label htmlFor="thyroid" className="cursor-pointer">Problemas de tireoide</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="cholesterol"
              checked={formData.healthIssues?.includes('cholesterol')}
              onCheckedChange={() => toggleHealthIssue('cholesterol')}
            />
            <Label htmlFor="cholesterol" className="cursor-pointer">Colesterol alto</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="asthma"
              checked={formData.healthIssues?.includes('asthma')}
              onCheckedChange={() => toggleHealthIssue('asthma')}
            />
            <Label htmlFor="asthma" className="cursor-pointer">Asma</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="joint-pain"
              checked={formData.healthIssues?.includes('joint-pain')}
              onCheckedChange={() => toggleHealthIssue('joint-pain')}
            />
            <Label htmlFor="joint-pain" className="cursor-pointer">Dores articulares</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="back-pain"
              checked={formData.healthIssues?.includes('back-pain')}
              onCheckedChange={() => toggleHealthIssue('back-pain')}
            />
            <Label htmlFor="back-pain" className="cursor-pointer">Dores nas costas</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="no-health-issues"
              checked={formData.healthIssues?.includes('none')}
              onCheckedChange={() => toggleHealthIssue('none')}
            />
            <Label htmlFor="no-health-issues" className="cursor-pointer">Nenhum problema de saúde</Label>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Você toma algum medicamento regularmente?</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="blood-pressure-med"
              checked={formData.medications?.includes('blood-pressure')}
              onCheckedChange={() => toggleMedication('blood-pressure')}
            />
            <Label htmlFor="blood-pressure-med" className="cursor-pointer">Para pressão arterial</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="diabetes-med"
              checked={formData.medications?.includes('diabetes')}
              onCheckedChange={() => toggleMedication('diabetes')}
            />
            <Label htmlFor="diabetes-med" className="cursor-pointer">Para diabetes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="thyroid-med"
              checked={formData.medications?.includes('thyroid')}
              onCheckedChange={() => toggleMedication('thyroid')}
            />
            <Label htmlFor="thyroid-med" className="cursor-pointer">Para tireoide</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="cholesterol-med"
              checked={formData.medications?.includes('cholesterol')}
              onCheckedChange={() => toggleMedication('cholesterol')}
            />
            <Label htmlFor="cholesterol-med" className="cursor-pointer">Para colesterol</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="antidepressant"
              checked={formData.medications?.includes('antidepressant')}
              onCheckedChange={() => toggleMedication('antidepressant')}
            />
            <Label htmlFor="antidepressant" className="cursor-pointer">Antidepressivos</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="contraceptive"
              checked={formData.medications?.includes('contraceptive')}
              onCheckedChange={() => toggleMedication('contraceptive')}
            />
            <Label htmlFor="contraceptive" className="cursor-pointer">Anticoncepcional</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="no-medications"
              checked={formData.medications?.includes('none')}
              onCheckedChange={() => toggleMedication('none')}
            />
            <Label htmlFor="no-medications" className="cursor-pointer">Não tomo medicamentos</Label>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Você tem problemas para dormir?</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="insomnia"
              checked={formData.sleepProblems?.includes('insomnia')}
              onCheckedChange={() => toggleSleepProblem('insomnia')}
            />
            <Label htmlFor="insomnia" className="cursor-pointer">Insônia (dificuldade para dormir)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="wake-up"
              checked={formData.sleepProblems?.includes('wake-up')}
              onCheckedChange={() => toggleSleepProblem('wake-up')}
            />
            <Label htmlFor="wake-up" className="cursor-pointer">Acordo várias vezes durante a noite</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="snoring"
              checked={formData.sleepProblems?.includes('snoring')}
              onCheckedChange={() => toggleSleepProblem('snoring')}
            />
            <Label htmlFor="snoring" className="cursor-pointer">Ronco / Apneia do sono</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="tired"
              checked={formData.sleepProblems?.includes('tired')}
              onCheckedChange={() => toggleSleepProblem('tired')}
            />
            <Label htmlFor="tired" className="cursor-pointer">Acordo cansado mesmo dormindo bastante</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="no-sleep-problems"
              checked={formData.sleepProblems?.includes('none')}
              onCheckedChange={() => toggleSleepProblem('none')}
            />
            <Label htmlFor="no-sleep-problems" className="cursor-pointer">Não tenho problemas para dormir</Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="medicalHistory">Histórico médico relevante (opcional)</Label>
        <Textarea
          id="medicalHistory"
          placeholder="Cirurgias, lesões, tratamentos anteriores, ou qualquer outra informação que considere importante"
          value={formData.medicalHistory || ''}
          onChange={(e) => updateFormData({ medicalHistory: e.target.value })}
          rows={5}
        />
      </div>

      <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 rounded">
        <p className="text-sm text-emerald-800">
          <strong>Pronto!</strong> Você está a um clique de receber seu plano personalizado completo. 
          Clique em "Gerar Meu Plano" para finalizar.
        </p>
      </div>
    </div>
  );
}
