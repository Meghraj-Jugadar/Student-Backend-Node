const pool = require('../pool');

class userRepo{
    static async find(){
        const { rows } = await pool.query('SELECT * from std_user;');
        console.log(rows)
        //return toCamelCase(rows);
        return rows;
    }

    static async findByEmail(email){
        const { rows } = await pool.query(
            `
            SELECT * from std_user WHERE email = $1;
        `,
            [email]
        );
        return rows[0];
    }

    static async insert(name, number, email, psw){
        const { rows } = await pool.query('INSERT INTO std_user (name, number, email, pass) VALUES ($1, $2, $3, $4) RETURNING *;',
            [name, number, email, psw]
        );
        //return toCamelCase(rows)[0];
        return rows[0];
    }

    static async update(id, name, number, email, psw){
        const { rows } = await pool.query(
            'UPDATE std_user SET name = $1 , number = $2 , email = $3 , pass = $4  WHERE id = $5 RETURNING *;',
            [name, number, email, psw, id]
        );
        return rows[0];
    }

    static async delete(id){
        const { rows } = await pool.query(
            'DELETE FROM std_user WHERE id = $1 RETURNING *;',
            [id]
        );
        return rows[0];
    }

    static async count(){
        const { rows } = await pool.query('SELECT COUNT(*) FROM std_user;');

        return rows[0].count;
    }
}

module.exports = userRepo;