use anchor_lang::prelude::*;

declare_id!("2MaD7CKRv3cAfYkSDQqFSsySBFmupe3kCs1QUE6dGQ13");

#[program]
mod quilt {
    use super::*;
    pub fn create_user(ctx: Context<UserToKeys>,
                       _x: String,
                      _y : String) -> Result<()> {
        let user = &mut ctx.accounts.point;
        user.x = _x;
        user.y = _y;
        user.authority = *ctx.accounts.authority.key;
        user.bump = *ctx.bumps.get("point").unwrap();
        Ok(())
    }

    pub fn update_user(ctx: Context<Update>,
                _x: String,
                _y : String
                ) -> Result<()>{
                require!(*ctx.accounts.authority.key == ctx.accounts.point.authority,MyErr::NotOwner);
                ctx.accounts.point.x = _x;
                ctx.accounts.point.y = _y;
                    Ok(())
                }
    
    pub fn update_one(ctx: Context<Update>,
                    _x: String,
                    ) -> Result<()>{
                        let user = &mut ctx.accounts.point;
                    user.x = _x;
                        Ok(())
                    }
}

#[error_code]
pub enum MyErr{
    #[msg("Sender is not the owner")]
    NotOwner
}

#[derive(Accounts)]
pub struct UserToKeys<'info>{

    #[account(mut)]
    authority : Signer<'info>,

    #[account(
        init,
        payer = authority,
        space = 8 + 2 + 4 + 200 + 1, seeds = [b"point", authority.key().as_ref()], bump
    )]

    pub point : Account<'info,Point>,
    pub system_program : Program<'info,System>,
}

#[derive(Accounts)]
pub struct Update<'info> {

    #[account(mut, has_one = authority, seeds = [b"point", authority.key().as_ref()], bump = point.bump)]
    pub point: Account<'info, Point>,
    pub authority : Signer<'info>
}

#[account]
pub struct Point {
    authority : Pubkey,
    x : String,
    y: String,
    bump : u8,
}

