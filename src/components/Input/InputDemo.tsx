import { Input } from './Input';

export function InputDemo() {
  const formatCPF = (value: string) => {
    return value
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1-$2')
      .slice(0, 14);
  };

  const formatPhone = (value: string) => {
    if (value.length <= 10) {
      return value
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .slice(0, 14);
    }
    return value
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      <Input 
        label="CPF (Brasil)" 
        placeholder="000.000.000-00" 
        mask={/[^\d]/g}
        formatter={formatCPF}
      />
      
      <Input 
        label="Phone Number" 
        placeholder="(00) 00000-0000" 
        mask={/[^\d]/g}
        formatter={formatPhone}
      />
    </div>
  );
}


