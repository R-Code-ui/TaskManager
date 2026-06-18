import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface QuestionDisplayProps {
    type: 'text' | 'radio' | 'select';
    question: string;
    description?: string;
    value: string | number;
    onChange: (val: string) => void;
    options?: { value: string; label: string }[];
    placeholder?: string;
}

export default function QuestionDisplay({
    type,
    question,
    description,
    value,
    onChange,
    options = [],
    placeholder,
}: QuestionDisplayProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">{question}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                {type === 'text' && (
                    <Input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                    />
                )}
                {type === 'radio' && (
                    <RadioGroup value={String(value)} onValueChange={onChange}>
                        <div className="space-y-2">
                            {options.map((opt) => (
                                <div key={opt.value} className="flex items-center space-x-2">
                                    <RadioGroupItem value={opt.value} id={opt.value} />
                                    <Label htmlFor={opt.value}>{opt.label}</Label>
                                </div>
                            ))}
                        </div>
                    </RadioGroup>
                )}
                {type === 'select' && (
                    <Select value={String(value)} onValueChange={onChange}>
                        <SelectTrigger>
                            <SelectValue placeholder={placeholder || "Select answer"} />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </CardContent>
        </Card>
    );
}
