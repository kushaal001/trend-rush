
import { cn } from '@/lib/utils';
import { FilterTextInputProps } from '@/lib/types/table';
import { XCircle } from 'lucide-react';

export default function FilterTextInput(props: FilterTextInputProps) {
  const { handleFilters, clearFilter, type,
    name, label, value, onChange,
  } = props;

  return (
    <div className={cn(
      'relative w-[140px] filter-select border h-[32px] rounded-[6px] ',
      value ? 'border-2 border-gray-600 text-gray-600  ' : 'border-gray-300'
    )}>
      {label && !value && (
        <label htmlFor={name} className={cn(
          '  font-light text-xs ease-in duration-150 top-[50%] -translate-y-1/2   z-1 text-[#475569]',
        )}>
          {label}
        </label>
      )}
      <div className='relative flex '>
        <input
          className='w-full rounded-[10px] text-xs h-7 px-2 focus:outline-none'
          type={type}
          name={name}
          id={name}
          onChange={onChange || (({ target: { value } }) => handleFilters(name, value))}
          value={value || ''}
        />
        {
          value && (
            <button type='button' id={`filter-${name}-clear-button`} onClick={() => clearFilter(name)} >
              <XCircle className='h-[20px] w-[20px] text-gray-400  my-auto mx-1 cursor-pointer' />
            </button>
          )
        }
      </div>
    </div>
  )
}
