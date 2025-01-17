'use client';

import React, {useState} from 'react';
import { useSearchParams, usePathname, useRouter  } from 'next/navigation';

export default function UserSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  console.log(searchParams.get("query"))
  const [query, setQuery] = useState(searchParams.get("query")?.toString());

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="wg-filter flex-grow"
      onSubmit={(e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          search: { value: string };
        };
        const search = target.search.value; // typechecks!
        handleSearch(search)
      }}>
      <form className="form-search" >
        <fieldset className="name" >
          <input type="text" placeholder="Search here..." onChange={(e) => setQuery(e.target.value)} name="search" tabIndex={2} aria-required="true" value={query} />
        </fieldset>
        < div className="button-submit" >
          <button type="submit"> <i className="icon-search" /> </button>
        </div>
      </form>
    </div>
  );
}