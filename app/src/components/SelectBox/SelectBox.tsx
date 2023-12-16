import classes from './Select.module.css'
import * as Select from '@radix-ui/react-select';
import { ChevronDown, ChevronUp, Dot } from 'lucide-react'

function SelectBox({
  value,
  onValueChange,
  placeholder,
  options,
  label, id
}) {
  return <Select.Root value={value} onValueChange={onValueChange}>
    <Select.Trigger id={id} className={classes.SelectTrigger} aria-label={label} >
      <Select.Value aria-label={value || placeholder}>
        {value || placeholder}
      </Select.Value>
      <Select.Icon className={classes.SelectIcon}>
        <ChevronDown />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content sideOffset={5} position="popper" className={classes.SelectContent}>
        <Select.ScrollUpButton className={classes.ScrollBtn}>
          <ChevronUp />
        </Select.ScrollUpButton>

        <Select.Viewport className={classes.SelectViewport}>
          <Select.Group>
            {/* <Select.Label className={classes.SelectLabel}>{label}</Select.Label> */}

            {options.map(option =>
              <SelectItem key={option} value={option}>{option}</SelectItem>
            )}
          </Select.Group>
        </Select.Viewport>

        <Select.ScrollDownButton className={classes.ScrollBtn}>
          <ChevronDown />
        </Select.ScrollDownButton>

      </Select.Content>
    </Select.Portal>
  </Select.Root>;
}

const SelectItem = (({ children, value }) => {
  return (
    <Select.Item className={classes.SelectItem} value={value}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className={classes.SelectItemIndicator}>
        <Dot />
      </Select.ItemIndicator>
    </Select.Item>
  );
});


export default SelectBox;
