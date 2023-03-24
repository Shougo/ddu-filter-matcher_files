# ddu-filter-matcher_files

Filter files matcher for ddu.vim

This matcher filters specified files.

## Required

### denops.vim

https://github.com/vim-denops/denops.vim

### ddu.vim

https://github.com/Shougo/ddu.vim

## Configuration

```vim
call ddu#custom#patch_global(#{
    \   sourceOptions: #{
    \     _: #{
    \       matchers: ['matcher_files'],
    \     },
    \   }
    \ })

call ddu#custom#patch_global(#{
    \   filterParams: #{
    \     matcher_files #{
    \       globs: ['test_*.vim'],
    \       patterns: ['/test_[^/]*.vim$'],
    \     },
    \   }
    \ })
```
