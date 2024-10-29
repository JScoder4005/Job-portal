import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectTrigger } from '@radix-ui/react-select';
import { State } from 'country-state-city';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  location: z.string().min(1, { message: 'Select a location' }),
  company_id: z.string().min(1, { message: 'Select or Add a Company' }),
  requirements: z.string().min(1, { message: 'Requirements are required' }),
});

const PostJob = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: '',
      company_id: '',
      requirements: '',
    },
    resolver: zodResolver(schema),
  });
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
        Post a Job
      </h1>

      <form>
        <Input placeholder="Job Title" {...register('title')} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </form>

      <Textarea placeholder="Job Description" {...register('description')} />
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}

      <Select
      // value={location}
      //  onValueChange={(value) => setLocation(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Filter by Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {State.getStatesOfCountry('IN').map(({ name }) => {
              return (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PostJob;
