module game {
    // Define the Player resource struct
    resource struct Player {
        id: u64;
        name: String;
        score: u64;
    }

    // Create a new player and move it to the account's global storage
    public fun create_player(account: &signer, id: u64, name: String) {
        let player = Player { id, name, score: 0 };
        let addr = Signer::address_of(account);
        move_to(&account, player);
    }

    // Update the score of the player in the global storage
    public fun update_score(account: &signer, new_score: u64) {
        let addr = Signer::address_of(account);
        let player = borrow_global_mut<Player>(addr);
        player.score = new_score;
    }

    // Get the score of the player from the global storage
    public fun get_score(account: &signer): u64 {
        let addr = Signer::address_of(account);
        let player = borrow_global<Player>(addr);
        player.score
    }
}

